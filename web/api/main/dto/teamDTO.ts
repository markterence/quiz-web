export interface TeamDTO {
  id: string
  name: string
  discriminator: string
  displayName: string
  createdAt: string
  memberCount: number
}

export function mapToTeamDTO(data: any): TeamDTO {
  return {
    id: data.id || '',
    name: data.name || '',
    discriminator: data.discriminator || '',
    displayName: data.displayName || '',
    createdAt: data.created_at || '',
    memberCount: data.memberCount || 0,
  };
}
