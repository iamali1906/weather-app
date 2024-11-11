export interface WeatherDataProps {
  [key: string]: any;
}

export interface SliderProps {
  weather: WeatherDataProps[];
}

export interface LoginProps {
  error?: string;
  setUserName: (value: string) => void;
  setError: (value: string) => void;
  userName: string;
}

export interface OptionType {
  label: string;
  value: string;
}
