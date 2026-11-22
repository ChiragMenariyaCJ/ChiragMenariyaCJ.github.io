# Addressing and subnetting

Subnetting determines which addresses are local, how many endpoints fit in a segment, and which route wins. A tester uses it to respect scope; a defender uses it to understand trust boundaries.

## IPv4 structure

An IPv4 address has 32 bits. A prefix length states how many leading bits identify the network. In `192.0.2.37/27`, 27 bits are network bits and 5 are host bits.

| Prefix | Mask | Total addresses | Traditional usable hosts |
|---:|---|---:|---:|
| `/24` | `255.255.255.0` | 256 | 254 |
| `/25` | `255.255.255.128` | 128 | 126 |
| `/26` | `255.255.255.192` | 64 | 62 |
| `/27` | `255.255.255.224` | 32 | 30 |
| `/28` | `255.255.255.240` | 16 | 14 |
| `/29` | `255.255.255.248` | 8 | 6 |
| `/30` | `255.255.255.252` | 4 | 2 |

Cloud and point-to-point networks can reserve addresses differently. Verify the platform rather than assuming the traditional count.

## A reliable calculation method

For `192.0.2.37/27`:

1. Host bits: `32 - 27 = 5`.
2. Block size: `2^5 = 32` addresses.
3. Last-octet boundaries: `0, 32, 64, 96, ...`.
4. `37` falls in the block beginning at `32`.
5. Network: `192.0.2.32`.
6. Broadcast: `192.0.2.63`.
7. Traditional host range: `192.0.2.33-192.0.2.62`.

To verify calculations in a lab:

```python
import ipaddress

network = ipaddress.ip_interface("192.0.2.37/27").network
print("network:", network.network_address)
print("broadcast:", network.broadcast_address)
print("addresses:", network.num_addresses)
```

Calculate first; use a tool only to check your reasoning.

## Special-use ranges

| Range | Meaning |
|---|---|
| `10.0.0.0/8` | Private IPv4 |
| `172.16.0.0/12` | Private IPv4 |
| `192.168.0.0/16` | Private IPv4 |
| `127.0.0.0/8` | IPv4 loopback |
| `169.254.0.0/16` | IPv4 link-local |
| `192.0.2.0/24` | Documentation and examples |
| `198.51.100.0/24` | Documentation and examples |
| `203.0.113.0/24` | Documentation and examples |

Private does not mean trusted. It means the address is not globally routed as public Internet space.

## Variable-length subnetting

Allocate the largest requirement first. Suppose a lab `/24` needs segments for 100, 50, 20, and 10 hosts:

| Need | Smallest fit | Example allocation |
|---:|---:|---|
| 100 | `/25` | `10.20.0.0/25` |
| 50 | `/26` | `10.20.0.128/26` |
| 20 | `/27` | `10.20.0.192/27` |
| 10 | `/28` | `10.20.0.224/28` |

The remaining `10.20.0.240/28` can be reserved. Check for overlap before deploying routes, firewall rules, or test scopes.

## IPv6 essentials

IPv6 addresses are 128 bits and written in hexadecimal. One contiguous run of zero groups may be compressed with `::`.

- `::1/128`: loopback
- `fe80::/10`: link-local
- `2001:db8::/32`: documentation
- `/64`: normal LAN prefix size

IPv6 uses neighbour discovery through ICMPv6 rather than ARP. Disabling ICMPv6 broadly can break path MTU and neighbour discovery.

## Scope safety

Before an authorised assessment, turn written scope into exact CIDR ranges. Watch for:

- an address that belongs to a vendor or shared hosting provider;
- overlapping private ranges reachable through different VPNs;
- cloud load balancers whose resolved addresses change;
- IPv6 records omitted from an IPv4-only scope; and
- exclusions inside an otherwise approved range.

If scope is ambiguous, stop and obtain written clarification.

## Lab: plan an isolated range

You have `10.50.0.0/24` for an isolated practice environment. Create networks for 60 student workstations, 30 servers, 12 security appliances, and a point-to-point router link. Record prefix, mask, network, first host, last host, and broadcast for every network.

## Lab: predict the route

Given these routes:

```text
10.0.0.0/8        via 192.0.2.1
10.50.0.0/16      via 192.0.2.2
10.50.20.0/24     via 192.0.2.3
0.0.0.0/0         via 192.0.2.254
```

Predict the gateway for `10.50.20.9`, `10.50.99.9`, `10.99.1.9`, and `203.0.113.9`. Explain each choice using longest-prefix match.

## Checkpoint

Without a calculator, find the network, broadcast, and host range for `198.51.100.173/28`. Then describe why an incorrect prefix can appear as an intermittent security-control failure.

Next: [Protocols and services](protocols-services.md).
