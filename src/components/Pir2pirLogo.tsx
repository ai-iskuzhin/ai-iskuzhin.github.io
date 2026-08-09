type Pir2pirLogoProps = {
  size?: number
}

/** The Пир2Пир app mark — a square, self-contained SVG under /public. */
export function Pir2pirLogo({ size = 64 }: Pir2pirLogoProps) {
  return (
    <img className="p2p-logo" src="/logos/pir2pir.svg" alt="Пир2Пир" width={size} height={size} />
  )
}
