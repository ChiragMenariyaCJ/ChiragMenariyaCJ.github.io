# 🌐 Networking

A network is where systems expose trust. This four-week track takes you from moving a packet across a LAN to explaining a capture, calculating a subnet, and deciding whether an observation is normal, misconfigured, or suspicious.

!!! warning "Use an isolated lab"
    Run discovery and capture exercises only on systems and networks you own or are explicitly authorised to test. Examples use loopback, private lab ranges, or the documentation ranges `192.0.2.0/24`, `198.51.100.0/24`, and `203.0.113.0/24`.

## What you will be able to do

- trace encapsulation from application data to a physical or wireless frame;
- calculate IPv4 networks, host ranges, broadcasts, and route matches;
- explain ARP, DHCP, DNS, TCP, UDP, HTTP, and TLS from packet evidence;
- distinguish switching, routing, NAT, and firewall decisions;
- capture traffic safely and use filters to answer a specific question; and
- write a short network finding with evidence and a practical fix.

## Four-week route

| Week | Study | Build | Checkpoint |
|---|---|---|---|
| 1 | [Models, frames, switches, and routes](fundamentals.md) | Draw your lab and follow one connection through every layer | Explain what changes at each routed hop |
| 2 | [Addressing and subnetting](addressing-subnetting.md) | Divide a `/24` into four usable networks | Calculate each range without a calculator |
| 3 | [Protocols and services](protocols-services.md) | Observe DNS and a TCP handshake in your own lab | Reconstruct the conversation from a capture |
| 4 | [Packet analysis and troubleshooting](packet-analysis.md) | Investigate a deliberately broken local service | Produce a one-page evidence note |

Spend 45-60 minutes reading, then at least the same amount of time doing the lab. Repeat the checkpoints from memory at the end of each week.

## A repeatable way to reason about a connection

When a service does not work, avoid random commands. Ask these questions in order:

1. **Name:** Did the hostname resolve to the expected address?
2. **Route:** Is the destination local, or which gateway will receive it?
3. **Neighbour:** Can the host resolve the next hop to a link-layer address?
4. **Transport:** Did the TCP handshake complete, or did a UDP response return?
5. **Encryption:** Did the TLS handshake succeed and present the expected identity?
6. **Application:** Did the server return a valid protocol response?

That sequence is useful in operations, incident response, and authorised penetration tests because it turns a vague symptom into a falsifiable hypothesis.

## Capstone

Create two small virtual machines on a host-only network. Run an HTTP service on one, access it from the other, and collect:

- interface addresses and routing tables;
- the ARP or neighbour-cache entry for the peer;
- a DNS lookup if you assign a local name;
- a filtered packet capture showing connection setup and teardown; and
- a diagram that labels the client socket, server socket, switch, and any gateway.

Then break one thing at a time: stop the service, use the wrong port, remove the route, or deny the port with a local firewall. For each failure, record the symptom, the layer, the confirming command, and the repair.

## Knowledge check

You are ready to move on when you can answer these without notes:

1. Why does a switch learn MAC addresses but a router make decisions using IP prefixes?
2. What is the difference between a closed port, a filtered port, and an unreachable host?
3. Why can two hosts share the same subnet mask yet still fail to communicate?
4. Which packet fields prove that a TCP handshake completed?
5. What evidence separates a DNS problem from a TLS certificate problem?

Continue with [Linux for security practitioners](../linux/index.md) or apply the workflow with [Nmap](../tools/nmap.md) and [Wireshark](../tools/wireshark.md).
