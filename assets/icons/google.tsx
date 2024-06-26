const GoogleLogo = (props: any) => (
  <svg
    width={16}
    height={16}
    strokeLinejoin="round"
    data-testid="geist-icon"
    style={{
      color: "currentcolor",
    }}
    {...props}
  >
    <path
      fill="#4285F4"
      d="M8.16 6.545v3.099h4.305a3.689 3.689 0 0 1-1.607 2.407l2.596 2.014c1.513-1.396 2.386-3.447 2.386-5.883 0-.567-.051-1.113-.146-1.636H8.16Z"
    />
    <path
      fill="#34A853"
      d="m3.676 9.523-.585.448-2.073 1.614C2.334 14.197 5.032 16 8.16 16c2.16 0 3.97-.713 5.294-1.934l-2.596-2.015c-.713.48-1.622.77-2.698.77-2.08 0-3.848-1.403-4.48-3.294l-.004-.004Z"
    />
    <path
      fill="#FBBC05"
      d="M1.018 4.415A7.901 7.901 0 0 0 .16 8c0 1.294.313 2.509.858 3.585 0 .008 2.662-2.065 2.662-2.065-.16-.48-.255-.99-.255-1.52 0-.531.095-1.04.255-1.52L1.018 4.415Z"
    />
    <path
      fill="#EA4335"
      d="M8.16 3.185c1.178 0 2.225.408 3.062 1.193l2.29-2.29C12.123.792 10.32 0 8.16 0 5.033 0 2.334 1.796 1.018 4.415L3.68 6.48c.633-1.89 2.4-3.295 4.48-3.295Z"
    />
  </svg>
);

export default GoogleLogo;
