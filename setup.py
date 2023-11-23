import setuptools
from pathlib import Path

README = (Path(__file__).parent/"README.md").read_text()

setuptools.setup(
    name="streamlit-datetime-range-picker",
    version="0.0.1",
    author="Yang Qian",
    author_email="qian.yang2@thoughtworks.com",
    description="this is datetime range picker for streamlit",
    long_description=README,
    long_description_content_type="text/markdown",
    url="https://github.com/imdreamer2018/streamlit-datetime-range-picker",
    packages=setuptools.find_packages(),
    include_package_data=True,
    classifiers=[],
    python_requires=">=3.10",
    license_files=("LICENSE",),
    install_requires=[
        # By definition, a Custom Component depends on Streamlit.
        # If your component has other Python dependencies, list
        # them here.
        "streamlit>=1.27.0",
    ],
)