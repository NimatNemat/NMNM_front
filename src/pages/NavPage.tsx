import React from 'react';
import { Link } from 'react-router-dom';
import Styles from '../config/globalFontStyle.module.css';

function NavPage() {
  return (
    <div className="NavPage">
      <div>
        <Link to="/intro/" className={Styles.h1}>
          intro
        </Link>
      </div>
      <div>
        <Link to="/main/" className={Styles.h1}>
          main
        </Link>
      </div>
      <div>
        <Link to="/login/" className={Styles.h1}>
          login
        </Link>
      </div>
      <div>
        <Link to="/idsearch/" className={Styles.h1}>
          idsearch
        </Link>
      </div>
      <div>
        <Link to="/mypage/" className={Styles.h1}>
          mypage
        </Link>
      </div>
      <div>
        <Link to="/preference/" className={Styles.h1}>
          preference
        </Link>
      </div>
      <div>
        <Link to="/register/" className={Styles.h1}>
          register
        </Link>
      </div>
      <div>
        <Link to="/modify/" className={Styles.h1}>
          modify
        </Link>
      </div>
      <div>
        <Link to="/detail/" className={Styles.h1}>
          detail
        </Link>
      </div>
    </div>
  );
}

export default NavPage;
