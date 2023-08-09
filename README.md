# NATS perf test

**NATS server version**: 2.9.21
```
[17056] 2023/08/09 17:47:17.691879 [INF] Starting nats-server
[17056] 2023/08/09 17:47:17.692931 [INF]   Version:  2.9.21
[17056] 2023/08/09 17:47:17.692931 [INF]   Git:      [b2e7725]
[17056] 2023/08/09 17:47:17.693459 [INF]   Name:     NDDLAYHA256ZGYEFYEIMV6O5AOMU56CPFERN37VVFTMLP5XZYZJUPL3D
[17056] 2023/08/09 17:47:17.693459 [INF]   ID:       NDDLAYHA256ZGYEFYEIMV6O5AOMU56CPFERN37VVFTMLP5XZYZJUPL3D
[17056] 2023/08/09 17:47:17.695019 [INF] Listening for client connections on 0.0.0.0:4222
[17056] 2023/08/09 17:47:17.706678 [INF] Server is ready
```

**NATS lib version:** 2.5.1
**Node.js**: 18.16.0
**OS**: Windows 10

## Test

```bash
node latency.js
```

## Result
```
d:\Work\tmp\nats-perf-test>node latency.js
Connected. Start...
70 req/s
72 req/s
71 req/s
72 req/s
70 req/s
70 req/s
69 req/s
72 req/s
86 req/s
74 req/s
73 req/s
71 req/s
71 req/s
68 req/s
69 req/s
68 req/s
69 req/s
71 req/s
68 req/s
```

## After modified `sendCommand`

```
```