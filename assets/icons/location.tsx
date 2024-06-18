const LocationIcon = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path
      stroke="#A2A2A2"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M10 7a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
    />
    <path
      stroke="#A2A2A2"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M13 7c0 4.761-5 7.5-5 7.5S3 11.761 3 7a5 5 0 1 1 10 0Z"
    />
  </svg>
);

export default LocationIcon;
