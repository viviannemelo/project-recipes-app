import React from 'react';
import { Link } from 'react-router-dom';

import DrinkIcon from '../images/drinkIcon.svg';
import MealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <div data-testid="footer" className="footer">
      <footer>
        <Link to="/drinks">
          <img
            data-testid="drinks-bottom-btn"
            src={ DrinkIcon }
            alt="drink icon"
          />
        </Link>
        <Link to="/meals">
          <img
            data-testid="meals-bottom-btn"
            src={ MealIcon }
            alt="meal icon"
          />
        </Link>
      </footer>
    </div>
  );
}

export default Footer;
