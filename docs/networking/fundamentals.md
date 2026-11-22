# Models, frames, switches, and routes

The OSI and TCP/IP models are not trivia lists. They are maps for deciding where data was changed, dropped, or misunderstood.

## Learning objectives

- Map common protocols and devices to a layer.
- Describe encapsulation and decapsulation.
- Explain a switch's forwarding decision.
- Explain a host's local-versus-remote routing decision.
- Identify useful evidence at each layer.

## The models

| OSI layer | TCP/IP view | Unit | Examples | Useful evidence |
|---|---|---|---|---|
| 7 Application | Application | Data | HTTP, DNS, SSH | status codes, queries, server logs |
| 6 Presentation | Application | Data | TLS, JSON, UTF-8 | certificates, encoding, cipher negotiation |
| 5 Session | Application | Data | RPC sessions, tokens | session identifiers and timeouts |
| 4 Transport | Transport | Segment/datagram | TCP, UDP | ports, flags, sequence numbers |
| 3 Network | Internet | Packet | IPv4, IPv6, ICMP | source/destination IP, TTL, routes |
| 2 Data link | Link | Frame | Ethernet, Wi-Fi, ARP | MAC addresses, VLAN tag |
| 1 Physical | Link | Bits | copper, fibre, radio | link state, signal, errors |

Real implementations blur boundaries. Use the model to organise evidence, not to force every protocol into a perfect box.

## Encapsulation by example

Suppose `192.0.2.10:53000` opens HTTPS to `198.51.100.20:443`.

1. The application creates an HTTP request and TLS protects it.
2. TCP adds source and destination ports, flags, and sequence information.
3. IP adds source and destination addresses plus a hop limit or TTL.
4. Ethernet adds source and next-hop destination MAC addresses and an integrity check.
5. The interface transmits the frame as signals.

At a router, the link-layer header is removed and replaced for the next link. The end-to-end IP addresses normally remain, while the Ethernet addresses change at every routed hop. NAT is an important exception because it rewrites address or port information and tracks the translation.

## Switching

A switch builds a MAC address table by observing the source address of incoming frames.

- If the destination MAC is known, the frame is sent only to the learned port.
- If it is unknown, the switch floods it within that VLAN.
- Broadcast traffic is flooded within the broadcast domain.
- A router or layer-3 interface is required to move traffic between IP networks.

VLANs create separate layer-2 broadcast domains on shared hardware. A trunk can carry several VLANs using tags; an access port normally carries one untagged client VLAN.

## Routing

A host compares the destination against its routes and chooses the most specific matching prefix, called **longest-prefix match**.

```text
Destination        Gateway          Interface
192.0.2.0/24       on-link          eth0
198.51.100.0/24    192.0.2.1        eth0
0.0.0.0/0          192.0.2.254      eth0
```

Traffic for `198.51.100.20` uses `192.0.2.1` because `/24` is more specific than the default `/0`. The frame is addressed to the gateway's MAC, but the packet remains addressed to `198.51.100.20`.

## Ports and sockets

A port identifies a transport-layer endpoint, not a program by itself. A socket is commonly described by protocol, local address, local port, remote address, and remote port.

```text
TCP 192.0.2.10:53000 -> 198.51.100.20:443
```

Servers generally listen on stable ports; clients usually receive temporary high ports. One server port can support many clients because each flow has a distinct tuple.

## Lab: follow a local connection

Use three terminals on a Linux lab host so the short-lived client connection is
visible while it happens.

```bash
# Terminal 1: start a local-only web server
python3 -m http.server 8000 --bind 127.0.0.1

# Terminal 2: inspect the listener, then watch port 8000 sockets
ss -lntp
watch -n 0.2 "ss -ant | grep ':8000'"

# Terminal 3: make the request while Terminal 2 is watching
curl -I http://127.0.0.1:8000/
```

Answer:

1. Which address and port are listening?
2. Which temporary client port was selected?
3. Why is there no ARP exchange for this request?
4. Which layers are still present on a loopback connection?

Stop the server, repeat `curl`, and compare the error with an incorrect hostname. Record how the symptoms differ.

## Lab: map your authorised network

Without scanning, collect local configuration:

=== "Linux"

    ```bash
    ip -brief address
    ip route
    ip neighbour
    resolvectl status
    ```

=== "Windows PowerShell"

    ```powershell
    Get-NetIPConfiguration
    Get-NetRoute -AddressFamily IPv4
    Get-NetNeighbor
    Get-DnsClientServerAddress
    ```

Draw the interface, IP/prefix, default gateway, DNS server, and known neighbours. Mark facts directly observed by a command separately from assumptions.

## Checkpoint

Explain, in order, what a workstation must learn or decide before sending the first packet to a remote web server. Include DNS, route choice, neighbour resolution, and TCP.

Next: [Addressing and subnetting](addressing-subnetting.md).
