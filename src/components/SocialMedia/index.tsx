import FacebookIcon from '@/assets/icons/social-medias/facebook-social-solid.svg';
import InstagramIcon from '@/assets/icons/social-medias/instagram-social-solid.svg';
import LinkedinIcon from '@/assets/icons/social-medias/linkedin-social-solid.svg';
import TelegramIcon from '@/assets/icons/social-medias/telegram-social-solid.svg';
import YoutubeIcon from '@/assets/icons/social-medias/youtube-social-solid.svg';

import styles from './styles.module.scss';

const socialMedias = [
  {
    link: 'https://www.facebook.com/people/FoyDa/61573229387597/',
    Icon: FacebookIcon,
    title: 'facebook',
  },
  {
    link: 'https://www.instagram.com/foydabroker/',
    Icon: InstagramIcon,
    title: 'instagram',
  },
  {
    link: 'https://www.linkedin.com/company/foyda',
    Icon: LinkedinIcon,
    title: 'linkedin',
  },
  {
    link: 'https://www.youtube.com/@foyda-broker',
    Icon: YoutubeIcon,
    title: 'youtube',
  },
  {
    link: 'https://t.me/foyda_broker',
    Icon: TelegramIcon,
    title: 'telegram',
  },
];

const SocialMedia: React.FC = () => {
  return (
    <div className={styles.socialMedia}>
      {socialMedias.map(({ link, Icon, title }) => (
        <a
          key={title}
          href={link}
          target="_blank"
          rel="noreferrer"
          title={title}
        >
          <Icon className={styles.icon} />
        </a>
      ))}
    </div>
  );
};

export default SocialMedia;
