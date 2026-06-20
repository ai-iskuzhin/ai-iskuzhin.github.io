type VerificaHubWordmarkProps = {
  size?: number
}

/** The VerificaHub wordmark: "Verifica" + a boxed "HUB", in Unbounded. */
export function VerificaHubWordmark({ size = 22 }: VerificaHubWordmarkProps) {
  return (
    <span className="vh-wordmark" style={{ fontSize: `${size}px` }}>
      <span className="vh-wordmark__name">Verifica</span>
      <span className="vh-wordmark__badge">HUB</span>
    </span>
  )
}

type VerificaHubLogoProps = {
  size?: number
}

export function VerificaHubLogo({ size = 64 }: VerificaHubLogoProps) {
  return (
    <img
      className="vh-logo"
      src="/logos/verificahub.svg"
      alt="VerificaHub"
      width={size}
      height={size}
    />
  )
}
