export type User = {
  type: string;
  attributes: { 'custom:account_address': string };
  network: Network;
  username: string;
  ethBalance: string;
  wethBalance: string;
};

export type Network = {
  name: string;
  short_name: string;
  chain: string;
  network: string;
  network_id: number;
  chain_id: string;
  providers: string[];
  rpc_url: string;
  block_explorer: string;
  hub_sort_order?: number;
};
