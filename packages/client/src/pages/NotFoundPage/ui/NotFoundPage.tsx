import notFoundImg from '@/shared/assets/images/404-not-found.png';
import { Segment } from '@/shared/ui/Segment';

import classes from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <Segment title='404 Not Found'>
      <img src={notFoundImg} alt='404 Not Found' width={800} height={600} className={classes.img} />
    </Segment>
  );
};
