import React from 'react';
import { Link } from 'react-router-dom';

function IntroPage() {
  return (
    <div className="IntroPage">
      <div>
        <Link to="/main/">main</Link>
      </div>
      <div>
        <Link to="/login/">login</Link>
      </div>
      <div>
        <Link to="/idsearch/">idsearch</Link>
      </div>
      <div>
        <Link to="/mypage/">mypage</Link>
      </div>
      <div>
        <Link to="/preference/">preference</Link>
      </div>
      <div>
        <Link to="/register/">register</Link>
      </div>
      <div>
        <Link to="/registerdetail/">registerdetail</Link>
      </div>
      <div>
        <Link to="/detail/">detail</Link>
      </div>
    </div>
  );
}

export default IntroPage;
