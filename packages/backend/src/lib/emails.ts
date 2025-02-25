import { memoize } from 'lodash';
import { promises as fs } from 'fs';
import path from 'path';
import fg from 'fast-glob';

import { Idea, User } from '@prisma/client';

import { env } from './env';

const getHtmlTemplates = memoize(async () => {
  const pathes: string[] = [];
  const emailsDistDir = path.resolve(__dirname, '../emails/dist');

  // Check directory content recursively
  try {
    // Try with a simple non-glob pattern first
    const simpleHtmlPaths = fg.sync('*.html', { cwd: emailsDistDir });
    for (const simpleHtmlPath of simpleHtmlPaths) {
      pathes.push(path.resolve(emailsDistDir, simpleHtmlPath));
    }
  } catch (error) {
    console.error(`Error checking directory contents: ${error}`);
  }

  const htmlTemplates: Record<string, string> = {};
  for (const htmlPath of pathes) {
    const templateFileName = path.basename(htmlPath, '.html');
    htmlTemplates[templateFileName] = await fs.readFile(htmlPath, 'utf-8');
  }
  return htmlTemplates;
});

const getHtmlTemplate = async (templateName: string) => {
  const htmlTemplates = await getHtmlTemplates();
  return htmlTemplates[templateName];
};

interface EmailTemplate {
  to: string;
  subject: string;
  templateName: string;
  templateVariables?: Record<string, any>;
}

const sendEmail = async ({ to, subject, templateName, templateVariables }: EmailTemplate) => {
  try {
    const htmlTemplate = await getHtmlTemplate(templateName);
    const fullTemplateVariables = {
      ...templateVariables,
      homeUrl: env.WEBAPP_URL,
    };
    console.info(`Sending email to ${to} with subject ${subject}`);
    console.info(`Template variables: ${JSON.stringify(fullTemplateVariables)}`);
    console.info(`HTML template: ${htmlTemplate}`);
    return true;
  } catch (error) {
    console.error(`Failed to send email: ${error}`);
    return false;
  }
};

export const sendWelcomeEmail = async (user: Pick<User, 'nick' | 'email'>) => {
  return await sendEmail({
    to: user.email,
    subject: 'Welcome to IdeaNick',
    templateName: 'welcome',
    templateVariables: {
      userNick: user.nick,
      addIdeaUrl: `${env.WEBAPP_URL}/ideas/new`,
    },
  });
};

export const sendIdeaBlockedEmail = async (user: Pick<User, 'nick' | 'email'>, idea: Pick<Idea, 'nick'>) => {
  return await sendEmail({
    to: user.email,
    subject: 'Idea blocked',
    templateName: 'ideaBlocked',
    templateVariables: {
      ideaNick: idea.nick,
    },
  });
};
