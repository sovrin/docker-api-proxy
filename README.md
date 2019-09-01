# docker-api-proxy

> safely proxy http requests to docker fd socket via nodejs

## Installation

```npm
npm i sovrin@docker-api-proxy -g
```

## About
docker-api-proxy forwards all http requests by a single randomly generated endpoint to the docker daemon. This allows communication with the outside world (e.g. for Portainer) provided the client knows the complete url.

## Usage

```bash
$ WHITELIST=<clientIP> dap
```

## Environment Variables

- `PORT`: exposed port (default: 2357)
- `SOCKET_PATH`: path to docker socket (default: on windows: `//./pipe/docker_engine` | on unix: `/var/run/docker.sock`)
- `IP_WHITELIST`: list of whitelisted ips
- `CUSTOM_ENDPOINT`: (optional, predefined endpoint; default: random 32char)

> Note: If using CUSTOM_ENDPOINT its highly recommended to use a long and not so easy to guess endpoint. Obviously only URL safe characters are allowed. 

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)