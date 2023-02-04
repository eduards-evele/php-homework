

interface Props {
  color: string
  size: number
}


export const Check: React.FC<Props> = ({ size, color }) => (
  <svg
    viewBox="0 0 405 405"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    role="presentation"
    focusable="false"
    {...{ color }}
    height={size}
    width={size}
    fill={color}
  >
    <path d="M393.401,124.425L179.603,338.208c-15.832,15.835-41.514,15.835-57.361,0L11.878,227.836   c-15.838-15.835-15.838-41.52,0-57.358c15.841-15.841,41.521-15.841,57.355-0.006l81.698,81.699L336.037,67.064   c15.841-15.841,41.523-15.829,57.358,0C409.23,82.902,409.23,108.578,393.401,124.425z" />
  </svg>
)


export const CloseIcon: React.FC<Props> = ({ size, color }) => (
  <svg
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    strokeWidth="0.7mm"
    role="presentation"
    aria-hidden="true"
    focusable="false"
    stroke={color}
    {...{ color }}
    height={size}
    width={size}
    fill={color}
  >
    <path d="m6 6 20 20" />
    <path d="m26 6-20 20" />
  </svg>
)