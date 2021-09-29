from pathlib import Path

def create_dir_if_not_exists(directory):
    """
        TODO docstring
    """
    # https://stackoverflow.com/questions/273192/how-can-i-safely-create-a-nested-directory-in-python
    Path(directory).mkdir(parents=True, exist_ok=True)
