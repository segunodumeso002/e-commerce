export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-700 via-pink-500 to-yellow-400 text-white py-6 mt-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <div>
          <h2 className="font-bold text-lg mb-2">MyStore</h2>
          <p className="text-sm">Your one-stop shop for everything!</p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 items-center mt-4 md:mt-0">
          <a href="mailto:support@mystore.com" className="hover:underline">support@mystore.com</a>
          <span>|</span>
          <a href="/contact" className="hover:underline">Contact Us</a>
          <span>|</span>
          <span>© {new Date().getFullYear()} MyStore</span>
        </div>
      </div>
    </footer>
  );
}