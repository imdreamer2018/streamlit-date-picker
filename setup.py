import setuptools
from pathlib import Path

README = (Path(__file__).parent/"README.md").read_text()

setuptools.setup(
    name="streamlit-date-picker",
    version="0.0.4",
    author="Yang Qian",
    author_email="qian.yang2@thoughtworks.com",
    description="this is date picker for streamlit",
    long_description=README,
    long_description_content_type="text/markdown",
    url="https://github.com/imdreamer2018/streamlit-date-picker",
    packages=setuptools.find_packages(),
    include_package_data=True,
    classifiers=[],
    python_requires=">=3.8",
    license_files=("LICENSE",),
    install_requires=[
        # By definition, a Custom Component depends on Streamlit.
        # If your component has other Python dependencies, list
        # them here.
        "streamlit>=1.27.0",
    ],
)