const Exit = (props:any) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={17}
      height={16}
      fill="none"
      {...props}
    >
      <mask id="a" fill="#fff">
        <path d="M5 0h11.2v16H5V0Z" />
      </mask>
      <path
        fill="red"
        d="M16.2 0h1v-1h-1v1Zm0 16v1h1v-1h-1ZM5 1h11.2v-2H5v2Zm10.2-1v16h2V0h-2Zm1 15H5v2h11.2v-2Z"
        mask="url(#a)"
      />
      <path
        fill="red"
        d="M11.354 8.354a.5.5 0 0 0 0-.708L8.172 4.464a.5.5 0 1 0-.708.708L10.293 8l-2.829 2.828a.5.5 0 1 0 .708.708l3.182-3.182ZM0 8.5h11v-1H0v1Z"
      />
    </svg>
  )

export default Exit;