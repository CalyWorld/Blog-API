declare module "js-cookie" {
  function set(key: string, value: string, options?: any): void;
  function get(key: string);
  string | undefined;
  function remove(key: string, options?: any): void;

  export { set, get, remove };
}
