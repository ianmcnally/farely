import React from 'react'

const Footer = () => {
  return (
    <footer>
      <small className='footer-link'>Say hello <a href='http://twitter.com/farelyapp' target='_blank'>@farelyapp</a>.
      </small>
      <small className='footer-link'><a href='http://cash.me/$ianmcnally' target='_blank'>Tip us.</a></small>
      <article>
        <p className='footer-paragraph footer-solicitation'>
          The new year has brought new expenses for Farely, and we'd like to keep it ad free.
        </p>
        <p className='footer-paragraph footer-solicitation'>
          If you use and enjoy Farely, please consider supporting us&nbsp;
          <a href='http://cash.me/$ianmcnally' target='_blank'>here</a>.
        </p>
      </article>
      <p className='footer-paragraph footer-solicitation'>Thanks and happy new year!</p>
    </footer>
  )
}

export default Footer

