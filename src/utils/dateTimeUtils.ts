import format from "date-fns/format";

// Format to display date & time
export function _formatDate( date: string ) {
    return format(new Date(), 'yyyy-MM-dd HH:mm:ss')
} 

// Format to display the length of meditation session
export function _formatDuration (duration: number): string {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = duration % 60;
  
    return `${hours}h ${minutes}m ${seconds}s`;
  };