# Wireshark

Wireshark decodes packet captures so you can reconstruct a protocol conversation. It can expose credentials, tokens, personal data, and internal topology, so capture only what the authorised question requires.

## Capture versus display filters

- A **capture filter** limits packets written to disk and uses BPF syntax.
- A **display filter** selects packets already captured and uses Wireshark syntax.

| Goal | Capture filter | Display filter |
|---|---|---|
| One host | `host 192.0.2.10` | `ip.addr == 192.0.2.10` |
| HTTPS | `tcp port 443` | `tcp.port == 443` |
| DNS | `port 53` | `dns` |
| New TCP attempts | `tcp` | `tcp.flags.syn == 1 && tcp.flags.ack == 0` |
| HTTP errors | `tcp port 80` | `http.response.code >= 400` |

Test filters with a short capture before a long collection.

## A five-pass analysis method

1. **Context:** capture interface, location, time, addresses, and reported symptom.
2. **Endpoints:** use Conversations and Endpoints to find the relevant peers.
3. **Dependencies:** inspect ARP/ND and DNS before the application flow.
4. **Transport:** check handshake, timing, retransmissions, resets, and teardown.
5. **Application:** inspect protocol messages and correlate server/client logs.

## Useful display filters

```text
arp || icmp || icmpv6
dns.flags.response == 1
dns.flags.rcode != 0
tcp.stream eq 3
tcp.analysis.retransmission
tcp.flags.reset == 1
tls.handshake.type == 1
http.request
http.response.code >= 400
```

Right-click a packet and use **Conversation Filter** or **Follow TCP Stream** to narrow the view. Record the resulting filter in your notes so another analyst can reproduce it.

## Interpretation pitfalls

- Endpoint checksum offload can create false “bad checksum” indications.
- A capture point may see only one direction because of asymmetric routing.
- Retransmission labels are analysis hints and may reflect capture loss.
- TLS usually hides application content; metadata still shows endpoints, timing, handshake, and alerts.
- Packet order shown by capture time is not a substitute for TCP sequence reasoning.

## Lab

Start a loopback web server and capture one request:

```bash
sudo tcpdump -i lo -s 0 -w loopback-http.pcap 'tcp port 8000'
```

Open the file in Wireshark and identify:

1. the client and server ports;
2. all three handshake packets;
3. the HTTP request and response;
4. which side closes first; and
5. total conversation duration.

Repeat with the service stopped. Compare a connection refusal with an application-level HTTP error.

## Evidence checklist

- Original capture is read-only and hashed.
- Notes state the capture point, interface, filter, time, and timezone.
- Each conclusion cites packet numbers or a stream plus corroborating evidence.
- Sensitive payloads are not copied into the final report unnecessarily.

Read the deeper [packet-analysis lesson](../networking/packet-analysis.md) or return to the [Tools track](index.md).
