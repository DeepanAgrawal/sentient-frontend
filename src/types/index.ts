import { Message } from "ai";

export interface ParameterControlProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
}

export interface MetricsProps {
  tokensPerSecond: number;
  totalTokens: number;
}

export interface Metrics {
  tokensPerSecond: number;
  totalTokens: number;
}

export interface StreamContextProps {
  messages: Message[];
  sendMessage: (input: string) => Promise<void>;
  isLoading: boolean;
  metrics: Metrics;
  input: string;
  handleInputChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  setInput: (input: string) => void;
  handleSubmit: (
    event?: {
      preventDefault?: () => void;
    },
    chatRequestOptions?: ChatRequestOptions
  ) => void;
}
