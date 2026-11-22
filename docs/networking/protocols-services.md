# Protocols and services

A service is more than an open port. It is a sequence of dependencies: address configuration, name resolution, transport setup, optional encryption, authentication, and application behaviour.

## ARP and neighbour discovery

IPv4 ARP maps a local IP address to a MAC address. A host broadcasts a request and the owner replies. Entries are cached for a limited time.

```bash
ip neighbour show
```

Unexpected changes can be benign (failover, DHCP reuse, virtual machines) or suspicious. Correlate them with switch, DHCP, endpoint, and timing evidence before drawing a conclusion.

IPv6 uses ICMPv6 neighbour discovery. The security question is the same: which link-layer endpoint is claiming the next-hop address, and what corroborates that claim?

## DHCP

The classic IPv4 exchange is often remembered as DORA:

1. **Discover:** a client looks for servers.
2. **Offer:** a server proposes configuration.
3. **Request:** the client requests an offered lease.
4. **Acknowledge:** the server confirms it.

Leases can include gateway, DNS servers, search domains, and other options. A wrong DHCP option can redirect or break many clients at once.

## DNS

DNS is a distributed database, not just a hostname lookup.

| Record | Purpose |
|---|---|
| `A` / `AAAA` | IPv4 / IPv6 address |
| `CNAME` | Alias to another name |
| `MX` | Mail exchanger |
| `NS` | Authoritative name server |
| `TXT` | Text policy or verification data |
| `PTR` | Reverse lookup |
| `SOA` | Zone authority and timing |

```bash
dig example.com A
dig example.com AAAA
dig +trace example.com
```

Use a public domain only for ordinary DNS queries; keep active service testing in your own lab. Record the resolver used, response code, answer, TTL, and whether the response was authoritative.

## TCP

TCP provides an ordered byte stream. A normal connection begins:

```text
Client -> Server  SYN      seq=x
Server -> Client  SYN,ACK  seq=y ack=x+1
Client -> Server  ACK      ack=y+1
```

Common observations:

- **RST after SYN:** the host is reachable but nothing accepts that port, or a device actively rejects it.
- **Repeated SYN with no reply:** loss or filtering is possible; corroborate before concluding.
- **Handshake then immediate FIN/RST:** transport worked; investigate TLS or application behaviour.
- **Retransmissions:** may indicate loss, congestion, capture artefacts, or an unresponsive receiver.

TCP flags are context, not a verdict.

## UDP

UDP has no handshake and no built-in delivery guarantee. A missing response is ambiguous: the request or response might be lost, a firewall may drop it, or the service may intentionally remain silent. ICMP errors can help, but they may also be filtered.

Typical UDP services include DNS, DHCP, NTP, and parts of modern HTTP/3. Applications add their own retry and state logic.

## HTTP and TLS

For HTTPS, separate these stages:

1. DNS resolves the name.
2. TCP connects (or QUIC uses UDP for HTTP/3).
3. TLS negotiates parameters and authenticates the server.
4. HTTP sends a method, path, headers, and optional body.
5. The server returns a status, headers, and optional body.

```bash
curl -vI https://example.com/
openssl s_client -connect example.com:443 -servername example.com </dev/null
```

The TLS server name is important on shared hosting. Connecting only by IP can select the wrong certificate or virtual host.

## Firewalls, state, and NAT

A stateless rule looks at individual packets. A stateful firewall tracks flows and can allow return traffic related to an approved connection. NAT records translations so replies can be mapped back to the original socket.

Document rules with direction, interface or zone, source, destination, protocol, port, state, action, logging, and business reason. Broad rules such as “any to any” hide design mistakes.

## Lab: observe protocol dependencies

On a machine you control:

```bash
dig example.com A
curl -vI https://example.com/
```

Then repeat with a nonexistent local name and with a closed local port such as `127.0.0.1:65534`. Compare which stage failed, how long failure took, whether an IP packet was sent, and the exact error reported by the client.

## Lab: read a TCP capture

Start a loopback web server as described in [network fundamentals](fundamentals.md), then capture only its port:

```bash
sudo tcpdump -i lo -nn 'tcp port 8000'
```

Make one request and identify the handshake, request data, response data, and connection close. Do not rely solely on colour or a tool's “info” column; point to flags, ports, and sequence/acknowledgement behaviour.

## Checkpoint

A browser reports `ERR_NAME_NOT_RESOLVED`; a second reports `connection refused`; a third reports a certificate name mismatch. Place each failure in the dependency chain and name one command that would confirm it.

Next: [Packet analysis and troubleshooting](packet-analysis.md).
