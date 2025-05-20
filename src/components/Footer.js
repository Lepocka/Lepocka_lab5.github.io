import React from 'react';

const Footer = function () {
  return React.createElement(
    "footer",
    null,
    React.createElement(
      "div",
      { className: "footer-container" },
      React.createElement(
        "div",
        { className: "footer-block" },
        React.createElement("h3", null, "Контакти"),
        React.createElement("p", null, "📧 Email: support@gamesite.com"),
        React.createElement("p", null, "📞 Телефон: +380 44 123 45 67")
      ),
      React.createElement(
        "div",
        { className: "footer-block" },
        React.createElement("h3", null, "Соцмережі"),
        React.createElement("p", null, "📘 Facebook: @gamesite_fb"),
        React.createElement("p", null, "🐦 Twitter: @gamesite_tw"),
        React.createElement("p", null, "📸 Instagram: @gamesite_ig")
      ),
      React.createElement(
        "div",
        { className: "footer-block" },
        React.createElement("h3", null, "Адреса"),
        React.createElement("p", null, "📍 Київ, вул. Геймерська, 12")
      )
    )
  );
};

export default Footer;
