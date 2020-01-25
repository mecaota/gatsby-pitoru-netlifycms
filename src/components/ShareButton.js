import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ShareButton = ({title, url, class_text, hashtag, sns}) => {
  const sns_urls = {
    'mastodon': 'https://mastoshare.net/post.php?text=',
    'facebook': 'https://www.facebook.com/sharer/sharer.php?src=sdkpreparse&u=',
    'twitter': 'https://twitter.com/intent/tweet?text='
  };
  const sns_colors = {
    'mastodon': '#2C90D9',
    'facebook': '#4166B2',
    'twitter': '#1B95E0'
  };
  const share_without_text = (sns)=>{return encodeURI(sns_urls[sns]);};
  const share_without_url = (title, hashtag, sns)=>{return encodeURI(sns_urls[sns] + title + '\n' + hashtag);};
  const share_with_urltext = (title, url, hashtag, sns)=>{return encodeURI(sns_urls[sns] + title + '\n' + hashtag + '\n' + url);};

  const handleClick = ()=>{
    let url = '';
    if(sns === 'facebook'){
      url = share_without_text(sns);
    }else if(sns === 'mastodon'){
      url = share_without_url(title, hashtag, sns);
    }else{
      url = share_with_urltext(title, url, hashtag, sns);
    }
    window.open(url);
  };
  return (
    <button
      title={title}
      aria-label={sns}
      className={class_text}
      style={{'backgroundColor':sns_colors[sns], 'border':'none', 'padding':'4px', 'font': 'inherit', 'color': 'inherit', 'cursor': 'pointer'}}
      onClick={handleClick}
    >
      <FontAwesomeIcon style={{'width': '1em', 'height': '1em'}} size='3x' icon={['fab', sns]} color='#ffffff' />
    </button>
  );
};

export default ShareButton;
