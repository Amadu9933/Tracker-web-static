
const socialLinks = [
  {
    name: "WhatsApp",
    href: "https://chat.whatsapp.com/LvXlVYRi39UBPaNyCDcgiB?s=cl&p=a&mlu=4&ilr=4",
    color: "hover:bg-[#25D366] hover:text-white",
    icon: (
      <path
        fill="currentColor"
        d="M12.04 2a9.96 9.96 0 0 0-8.6 15.02L2 22l5.1-1.34A10 10 0 1 0 12.04 2Zm0 18.2h-.01a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.03.79.81-2.95-.2-.3a8.18 8.18 0 1 1 6.91 3.78Zm4.5-6.13c-.25-.12-1.47-.72-1.7-.8-.22-.09-.4-.13-.56.12-.17.25-.65.81-.8.98-.15.17-.3.19-.55.06-.25-.12-1.05-.38-2-1.22-.74-.66-1.24-1.47-1.39-1.72-.15-.25-.02-.39.11-.52.11-.11.25-.3.38-.45.13-.15.17-.25.25-.42.08-.17.04-.32-.02-.45-.06-.13-.56-1.37-.77-1.88-.21-.49-.42-.42-.57-.43h-.49c-.17 0-.44.06-.67.32-.23.25-.88.86-.88 2.1s.9 2.44 1.03 2.61c.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.43.52.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.16-.48-.29Z"
      />
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/trackerrgo/",
    color: "hover:bg-gradient-to-tr hover:from-pink-500 hover:to-purple-600 hover:text-white",
    icon: (
      <>
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle
          cx="12"
          cy="12"
          r="4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
      </>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/trackerrgo/",
    color: "hover:bg-[#0A66C2] hover:text-white",
    icon: (
      <path
        fill="currentColor"
        d="M5.2 3a2.2 2.2 0 1 0 0 4.4 2.2 2.2 0 0 0 0-4.4ZM3.3 9h3.8v12H3.3V9Zm6.1 0H13v1.64h.05A4.1 4.1 0 0 1 16.7 8.7c3.9 0 4.6 2.57 4.6 5.91V21h-3.8v-5.67c0-1.35-.02-3.09-1.88-3.09-1.89 0-2.18 1.47-2.18 2.99V21H9.4V9Z"
      />
    ),
  },
];

const TrackerrGoSocials = ({ className = "" }) => {
  return (
    <div
      aria-label="TrackerrGo social media links"
      className={`flex items-center gap-2 ${className}`}
    >
      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`TrackerrGo on ${social.name}`}
          title={social.name}
          className={`flex h-8 w-8 items-center justify-center rounded-full
            text-gray-500 transition-all duration-200
            hover:-translate-y-0.5 ${social.color}
            focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-orange-500 focus-visible:ring-offset-2`}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-[17px] w-[17px]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {social.icon}
          </svg>
        </a>
      ))}
    </div>
  );
};

export default TrackerrGoSocials;