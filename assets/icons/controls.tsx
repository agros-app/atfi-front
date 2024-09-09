const Controls = (props:any) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={13}
      height={16}
      fill="none"
      {...props}
    >
      <path stroke="#000" d="M2.5 6v10M2.5 0v3" />
      <circle cx={2.5} cy={4.5} r={2} stroke="#000" />
      <path stroke="#000" d="M10.5 10V0M10.5 16v-3" />
      <circle
        cx={10.5}
        cy={11.5}
        r={2}
        stroke="#000"
        transform="rotate(-180 10.5 11.5)"
      />
    </svg>
  )
  export default Controls