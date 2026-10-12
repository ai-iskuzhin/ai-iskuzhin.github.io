type ProductLogoProps = {
  /** A square, self-contained SVG under /public. */
  src: string
  alt: string
  size?: number
}

/** A product's square app mark (TalkyHub, Sportgearhub). */
export function ProductLogo({ src, alt, size = 64 }: ProductLogoProps) {
  return <img className="product-logo" src={src} alt={alt} width={size} height={size} />
}
