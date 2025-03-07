import { memoize } from 'lodash';
import { promises as fs } from 'fs';
import path from 'path';
import fg from 'fast-glob';
import nodemailer from 'nodemailer';
import handlebars, { TemplateDelegate } from 'handlebars';

import { Idea, User } from '@prisma/client';

import { env } from './env';
import { logger } from './logger';

const getHandlebarsTemplates = memoize(async () => {
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
    logger.error('Email', error);
  }

  const hbrTemplates: Record<string, TemplateDelegate> = {};
  for (const htmlPath of pathes) {
    const templateFileName = path.basename(htmlPath, '.html');
    hbrTemplates[templateFileName] = handlebars.compile(await fs.readFile(htmlPath, 'utf-8'));
  }

  return hbrTemplates;
});

const getHtmlTemplate = async (templateName: string, templateVariables?: Record<string, any>) => {
  const hbrTemplates = await getHandlebarsTemplates();
  return hbrTemplates[templateName](templateVariables);
};

interface EmailTemplate {
  to: string;
  subject: string;
  templateName: string;
  templateVariables?: Record<string, any>;
}

const sendEmail = async ({ to, subject, templateName, templateVariables }: EmailTemplate) => {
  try {
    const fullTemplateVariables = {
      ...templateVariables,
      homeUrl: env.WEBAPP_URL,
    };
    const html = await getHtmlTemplate(templateName, fullTemplateVariables);

    const transporter = nodemailer.createTransport({
      host: 'localhost',
      port: 1025,
      secure: false,
      auth: {
        user: 'test@example.com',
        pass: 'test',
      },
    });

    const info = await transporter.sendMail({
      from: '"IdeaNick" <test@example.com>',
      to,
      subject,
      html,
    });

    logger.info('Email', `Email sent: ${info.messageId}`);
    return true;
  } catch (error) {
    logger.error('Email', error);
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
      userNick: user.nick,
    },
  });
};

export const sendMostLikedIdeasEmail = async (user: Pick<User, 'nick' | 'email'>, ideas: Pick<Idea, 'nick' | 'name'>[]) => {
  return await sendEmail({
    to: user.email,
    subject: 'Most liked ideas!',
    templateName: 'mostLikedIdeas',
    templateVariables: {
      ideas: ideas.map((idea) => ({
        userNick: user.nick,
        name: idea.name,
        url: `${env.WEBAPP_URL}/ideas/${idea.nick}`,
      })),
    },
  });
};
