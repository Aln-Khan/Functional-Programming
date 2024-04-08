
def remove_spaces(s):
    return s.replace(" ", "")

def to_lower_case(s):
    return s.lower()

def colorize_text(s, color="default", style="normal"):
    colors = {
        "default": "\033[0m", 
        "black": "\033[30m",
        "red": "\033[31m",
        "green": "\033[32m",
        "yellow": "\033[33m",
        "blue": "\033[34m",
        "magenta": "\033[35m",
        "cyan": "\033[36m",
        "white": "\033[37m"
    }
    styles = {
        "normal": "\033[0m",  
        "bold": "\033[1m",    
        "underline": "\033[4m" 
    }

    color_code = colors.get(color.lower(), colors["default"])
    style_code = styles.get(style.lower(), styles["normal"])

    return f"{style_code}{color_code}{s}\033[0m"  

def compose(*functions):
    def composed_function(arg, *args, **kwargs):
        result = arg
        for function in functions[:-1]: 
            result = function(result)
        result = functions[-1](result, *args, **kwargs)
        return result
    return composed_function

transform_string = compose(remove_spaces, to_lower_case, colorize_text)

input_string = "Example text for Trans FORMAtion"
output_string = transform_string(input_string, color="green", style="underline")
print(output_string)
