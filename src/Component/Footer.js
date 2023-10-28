import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {currentYear} DuckSick Group.FPT University.</p>
      </div>
    </footer>
  );
}

export default Footer;
