export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-12 border-t">
      <div className="max-w-7xl mx-auto px-4 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} SkillMatch. All rights reserved.
      </div>
    </footer>
  );
}
