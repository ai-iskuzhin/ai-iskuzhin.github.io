import type { SocialLink } from '../content/profile'
import { GitHubIcon, TelegramIcon, VkIcon, HhIcon, MailIcon } from './Icons'

export function SocialIcon({ type }: { type: SocialLink['type'] }) {
  switch (type) {
    case 'github':
      return <GitHubIcon />
    case 'telegram':
      return <TelegramIcon />
    case 'vk':
      return <VkIcon />
    case 'hh':
      return <HhIcon />
    case 'email':
    case 'phone':
      return <MailIcon />
    default:
      return null
  }
}
