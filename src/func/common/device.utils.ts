export const checkMobile = (): boolean => {
  if (typeof window === 'undefined') return false

  const mobileRegex =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone|Kindle|Silk|Mobile|Tablet|PlayStation Vita|Nintendo|Xbox/i
  const isMobileUA = mobileRegex.test(navigator.userAgent)
  const isSmallScreen = window.innerWidth <= 768

  return isMobileUA && isSmallScreen
}