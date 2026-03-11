// T adalah tipe data dinamis yang akan kita lempar nanti
export interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}