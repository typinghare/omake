# OMake

OMake is a simple build automation tool designed to simplify the process of compiling and executing OCaml projects.

## Install

To install OMake, open your terminal and run the following command:

~~~bash
npm install -g @typinghare/omake
~~~

This command installs OMake globally on your system, allowing you to use it in any project.

### Verifying the Installation

After installation, you can verify that OMake is correctly installed by checking its version:

~~~bash
omake --version
~~~

If OMake is installed properly, this command will display the version number.

## Set up your project

### Create a Configuration File

OMake uses a configuration file named `OMake.ini` to understand how to build and run your project. Here's how to set it up:

In the root directory of your project, create a file named `OMake.ini`, inside which specify the build instructions for your project. For example, to compile an OCaml file named `hello.ml`, your OMake.ini should look like this:

```ini
hello = . hello.ml
```

### Write Your Source Code

In the same directory where your OMake.ini is located, create a new file named `hello.ml`. Write or paste your source code into `hello.ml`. For a simple OCaml program that prints "Hello world!", use the following code:

```ocaml
print_string "Hello world!";;
```

### Running Your Project

With the configuration file and source code in place, you can now run your project using OMake:

```bash
omake hello
```

This command tells OMake to execute the build instructions defined in OMake.ini for the hello target, resulting in the compilation and execution of your OCaml program.

## Understand the Configuration File

In the OMake.ini file, each line configures an individual executable. The syntax for each line is as follows:

* Executable Name: Begins with the name of the executable.
* Equal Symbol (=): Follows the executable name, acting as a separator.
* Working Directory and Source Files: On the right-hand side of the equal symbol. The first entry should be the working directory, followed by the source files. These are separated by spaces.

Example format:

~~~ini
[Executable Name] = [Working Directory] [File1] [File2] ...
~~~

### Example

Suppose you have an executable named hello. You want to compile it using the files `hello.ml` and `world.ml` located in the directory `src`. Your `OMake.ini` should look like this:

~~~ini
hello = src hello.ml world.ml
~~~

Alternatively, if you want OMake to automatically include all `.ml` files in the src directory, simply write:

~~~ini
hello = src
~~~

In this case, OMake will scan the src directory and automatically add all `.ml` files it finds.

## License

Licensed under MIT.
