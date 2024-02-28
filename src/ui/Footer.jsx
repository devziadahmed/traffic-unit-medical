function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className=" bg-blue-600 p-4 text-white text-center">
      <span>جميع الحقوق محفوظة، بوابة مرور مصر © {currentYear}</span>
    </footer>
  );
}

export default Footer;
