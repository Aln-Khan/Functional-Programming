from collections import namedtuple

LogEntry = namedtuple('LogEntry', ['timestamp', 'severity', 'message'])

def read_log_files(file_path):
    logs = []
    with open(file_path, 'r') as file:
        for line in file:
            parts = line.strip().split(',')
            if len(parts) == 3:
                logs.append(LogEntry(*parts))
    return logs

def filter_logs_by_severity(logs, severity):
    filtered_logs = [log for log in logs if log.severity == severity]
    return filtered_logs

def count_logs_by_severity(logs, severity):
    filtered_logs = filter_logs_by_severity(logs, severity)
    return len(filtered_logs)

def calculate_average_message_length(logs):
    if len(logs) == 0:
        return 0
    total_length = sum(len(log.message) for log in logs)
    return total_length / len(logs)

file_path = 'test.log'
logs = read_log_files(file_path)

error_logs = filter_logs_by_severity(logs, 'ERROR')
print("Error record count:", count_logs_by_severity(logs, 'ERROR'))

average_length = calculate_average_message_length(logs)
print("Average length of message in logs:", average_length)
