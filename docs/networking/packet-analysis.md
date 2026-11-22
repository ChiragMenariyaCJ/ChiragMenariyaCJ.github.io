# Packet analysis and troubleshooting

Packet capture is most useful when it answers a narrow question. Capturing everything and browsing aimlessly produces noise and can collect sensitive data unnecessarily.

## A disciplined workflow

1. Write the symptom and expected behaviour.
2. State a testable hypothesis.
3. Choose the smallest useful capture point and filter.
4. Record clock, interface, addresses, and the action that triggers the issue.
5. Capture only long enough to reproduce it.
6. Preserve the original; analyse a copy.
7. Correlate with endpoint, application, firewall, and DNS logs.
8. Conclude only what the evidence supports.

Packet captures may contain credentials, tokens, personal data, and internal names. Limit access and retention according to your rules of engagement.

## Capture and display filters

Capture filters reduce what is recorded and use Berkeley Packet Filter syntax:

```bash
tcpdump -i eth0 -nn 'host 192.0.2.10 and tcp port 443'
tcpdump -i eth0 -nn -w case-001.pcap 'net 192.0.2.0/24 and not port 22'
```

Wireshark display filters select from an existing capture:

```text
ip.addr == 192.0.2.10
tcp.port == 443
dns.qry.name == "lab.example"
tcp.flags.syn == 1 && tcp.flags.ack == 0
tcp.analysis.retransmission
http.request.method == "GET"
tls.handshake.type == 1
```

Excluding your management connection (`not port 22`) can reduce noise, but make sure the exclusion does not hide the behaviour under investigation.

## Read a flow, not a packet

One packet rarely establishes cause. Reconstruct the conversation:

- Who initiated it?
- Did both directions reach the capture point?
- Did a handshake finish?
- How long passed between request and response?
- Were packets retransmitted or acknowledged?
- Which endpoint closed the connection?
- Does application content match the expected protocol?

Wireshark's **Follow TCP Stream** helps organise a flow, but the result may contain sensitive application data. Treat exports as evidence.

## Common patterns

| Pattern | Plausible interpretations | Next evidence |
|---|---|---|
| ARP requests with no reply | peer offline, wrong VLAN, wrong prefix | switch/VLAN config, peer interface |
| SYN repeated, no response | filtering, loss, wrong route | capture at next hop, firewall log |
| SYN followed by RST | port closed or active reject | listener list, service log |
| TCP succeeds, TLS alert | protocol/cipher/certificate issue | TLS alert and server log |
| DNS `NXDOMAIN` | name does not exist in queried view | resolver and authoritative answer |
| HTTP `401` | authentication required or failed | response headers and auth log |
| HTTP `403` | understood but denied | authorisation policy and app log |

These are starting hypotheses, not automatic findings.

## Timing and capture location

A capture sees only its observation point. Offloading can make endpoint captures show apparently invalid checksums or unusually large segments; the network adapter may complete that work after capture. Asymmetric routing can show only half a flow. NAT means the same connection has different tuples on each side of the translator.

Record where the capture was taken and synchronise clocks before correlating evidence.

## Lab: a controlled failure matrix

Run a local web server on port `8000`, then create these one at a time:

1. service running, correct address and port;
2. service stopped;
3. service running, client uses port `8001`;
4. hostname maps to the wrong loopback address in a temporary lab hosts file; and
5. if your lab permits it, a narrowly scoped local firewall drop for port `8000`.

For every case, save the client error, relevant socket state, a short filtered capture, the first packet that proves where behaviour diverges, and the corrective action. Remove the temporary firewall or hosts-file change when finished.

## Evidence note template

```text
Question:
Expected behaviour:
Observed behaviour:
Time and timezone:
Capture point/interface:
Display filter:
Key packets or stream:
Corroborating host/application evidence:
Conclusion:
Limitations / alternate explanations:
Recommended next step:
```

## Final assessment

You receive a capture in which DNS returns the expected IP, the client completes a TCP handshake to port 443, the server sends a TLS certificate for a different hostname, and the client sends an alert. Write a concise explanation for a system owner. Include what works, what fails, what evidence proves it, and a likely remediation.

Return to the [Networking track](index.md) or practise the interface with the [Wireshark guide](../tools/wireshark.md).
