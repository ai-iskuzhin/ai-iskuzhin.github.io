type NugetBadgeProps = {
  pkg: string
  kind: 'version' | 'downloads'
}

/** Live NuGet badge via shields.io. Reads the published package state at request time. */
export function NugetBadge({ pkg, kind }: NugetBadgeProps) {
  const src =
    kind === 'version'
      ? `https://img.shields.io/nuget/v/${pkg}?logo=nuget&logoColor=white&label=nuget&color=004880&style=flat-square`
      : `https://img.shields.io/nuget/dt/${pkg}?label=downloads&color=7C3AED&style=flat-square`
  const alt = kind === 'version' ? `${pkg} version on NuGet` : `${pkg} downloads on NuGet`
  return (
    <a className="nuget-badge" href={`https://www.nuget.org/packages/${pkg}`} target="_blank" rel="noreferrer">
      <img src={src} alt={alt} loading="lazy" decoding="async" height={20} />
    </a>
  )
}
