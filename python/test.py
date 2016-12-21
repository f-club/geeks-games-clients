#
#
#

from socketIO_client import SocketIO, LoggingNamespace

def on_bbb_response(*args):
    print('on_bbb_response', args)

def on_tt(*args):
    print('on_tt', args)

with SocketIO('localhost', 7777, LoggingNamespace) as socketIO:
    socketIO.emit('init', {'xxx': 'yyy'}, on_bbb_response)
    socketIO.on('tt', on_tt)
    socketIO.wait_for_callbacks(seconds=1)
