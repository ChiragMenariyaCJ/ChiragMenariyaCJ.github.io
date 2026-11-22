# Networking and packet reference

Use this alongside the [Networking track](../networking/index.md).

## Layers and units

| Layer | Unit | Address/identifier | Examples |
|---|---|---|---|
| Application | data | names, URLs, resource IDs | HTTP, DNS, SSH |
| Transport | TCP segment / UDP datagram | port | TCP, UDP |
| Network | packet | IPv4/IPv6 address | IP, ICMP |
| Data link | frame | MAC address | Ethernet, Wi-Fi, ARP |

## Private and documentation ranges

| Range | Use |
|---|---|
| `10.0.0.0/8` | private IPv4 |
| `172.16.0.0/12` | private IPv4 |
| `192.168.0.0/16` | private IPv4 |
| `127.0.0.0/8` | IPv4 loopback |
| `169.254.0.0/16` | IPv4 link-local |
| `192.0.2.0/24`, `198.51.100.0/24`, `203.0.113.0/24` | documentation |
| `::1/128` | IPv6 loopback |
| `fe80::/10` | IPv6 link-local |
| `2001:db8::/32` | IPv6 documentation |

## CIDR quick table

| Prefix | Mask | Addresses | Traditional hosts |
|---:|---|---:|---:|
| `/24` | `255.255.255.0` | 256 | 254 |
| `/25` | `255.255.255.128` | 128 | 126 |
| `/26` | `255.255.255.192` | 64 | 62 |
| `/27` | `255.255.255.224` | 32 | 30 |
| `/28` | `255.255.255.240` | 16 | 14 |
| `/29` | `255.255.255.248` | 8 | 6 |
| `/30` | `255.255.255.252` | 4 | 2 |

## Common ports

Ports are conventions, not proof of service identity.

| Port | Transport | Common service |
|---:|---|---|
| 22 | TCP | SSH |
| 25 | TCP | SMTP |
| 53 | TCP/UDP | DNS |
| 67/68 | UDP | DHCP server/client |
| 80 | TCP | HTTP |
| 123 | UDP | NTP |
| 389 | TCP/UDP | LDAP |
| 443 | TCP/UDP | HTTPS / HTTP/3 |
| 445 | TCP | SMB |
| 636 | TCP | LDAP over TLS |
| 3389 | TCP/UDP | RDP |

## Linux inspection

```bash
ip -brief address
ip route
ip route get 198.51.100.20
ip neighbour
ss -lntup
dig example.com A
curl -vI https://example.com/
traceroute 192.0.2.10
```

## Windows PowerShell inspection

```powershell
Get-NetIPConfiguration
Get-NetRoute -AddressFamily IPv4
Get-NetNeighbor
Get-NetTCPConnection -State Listen
Resolve-DnsName example.com
Test-NetConnection 192.0.2.10 -Port 443
```

## tcpdump capture filters

```bash
tcpdump -D
tcpdump -i eth0 -nn 'host 192.0.2.10'
tcpdump -i eth0 -nn 'tcp port 443'
tcpdump -i eth0 -s 0 -w capture.pcap 'net 192.0.2.0/24'
tcpdump -nn -r capture.pcap 'port 53'
```

## Wireshark display filters

```text
ip.addr == 192.0.2.10
tcp.port == 443
dns
tcp.flags.syn == 1 && tcp.flags.ack == 0
tcp.flags.reset == 1
tcp.analysis.retransmission
http.request
tls.handshake
```

## Diagnostic order

1. Interface and address.
2. Route and gateway.
3. Neighbour resolution.
4. DNS answer.
5. TCP/UDP behaviour.
6. TLS negotiation.
7. Application response.

Return to [Cheatsheets](index.md) or study [Packet analysis](../networking/packet-analysis.md).
