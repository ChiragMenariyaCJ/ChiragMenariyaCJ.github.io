# Netcat

Netcat (`nc`) reads and writes bytes over TCP or UDP. It is ideal for learning sockets and testing simple lab services, but variants use different flags. Check `nc -h` on your system.

!!! warning "Keep listeners isolated"
    Bind examples to loopback or a host-only lab network. A listener exposed on all interfaces may accept connections from unintended systems.

## TCP conversation on loopback

Terminal 1:

```bash
nc -l 127.0.0.1 9000
```

Terminal 2:

```bash
nc 127.0.0.1 9000
```

Type text in either terminal and observe it in the other. Use `ss -ntp` and a loopback packet capture to map terminal processes to socket endpoints.

Some implementations require `nc -l -p 9000 -s 127.0.0.1`. Do not copy flags without checking your version.

## Send a minimal HTTP request

With a local HTTP server on port `8000`:

```bash
printf 'GET / HTTP/1.1\r\nHost: 127.0.0.1\r\nConnection: close\r\n\r\n' \
  | nc 127.0.0.1 8000
```

This exposes the boundary between TCP bytes and HTTP syntax. Compare the raw response with `curl -i http://127.0.0.1:8000/`.

## Connectivity checks

```bash
nc -vz -w 3 127.0.0.1 8000
```

Use only on an explicitly approved address and port. Success proves that a TCP connection was accepted at that moment; it does not identify the service or prove it works correctly.

## UDP behaviour

Terminal 1:

```bash
nc -u -l 127.0.0.1 9001
```

Terminal 2:

```bash
printf 'lab message\n' | nc -u -w 1 127.0.0.1 9001
```

UDP has no handshake, so a client may appear successful even if no application receives the datagram. Confirm at the listener or with a capture.

## File-transfer caution

Plain Netcat provides no authentication, encryption, integrity protection, or safe filename metadata. Prefer SSH-based transfer in real environments. If you use it to demonstrate bytes in an isolated lab, compare a cryptographic hash at both ends and never send secrets.

## Lab

Build a two-terminal TCP conversation and answer:

1. Which endpoint actively opened the connection?
2. Which port is stable and which is temporary?
3. How does output differ when the listener is stopped?
4. What does the capture show for TCP that is absent from UDP?
5. What security properties are missing from both examples?

Return to the [Tools track](index.md) or review [TCP and UDP](../networking/protocols-services.md).
