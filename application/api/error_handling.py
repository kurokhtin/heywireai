import datetime

def log_error(error_msg):
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open('error.log', 'a') as log_file:
        log_file.write(f"[{timestamp}] {error_msg}\n")