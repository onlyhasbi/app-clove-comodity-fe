export function getFirstCharacter(profileName: string | boolean) {
  return typeof profileName === 'string' ? profileName.charAt(0) : '';
}
