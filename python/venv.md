# Setting up a simple development environment in python

Python dependencies work differently to Node ones, because they aren't local to the project, but are shared between projects. This can cause problems if different projects need different versions of the same dependency. The solution is to create a virtual environment for your project. There are many ways to do this, including virtualenv and venv. venv is what we'll be using since it's officially supported - it's worth noting, though, that vritualenv has been around for a while too. 

[This](https://vitux.com/install-python3-on-ubuntu-and-set-up-a-virtual-programming-environment/?__cf_chl_jschl_tk__=4493590630d0f18823b61d4b6c69444c99d4b330-1587907448-0-AXaSfQoXlQqpXPNr-e3678X-U9F7765Xa7ensgpODrDcFIjdMjWS-gmvmCjsYy8axP14oHoMiB3yZLXeOadTmaQ5d1QJFkImpcPGaklDEsYXuMGgFEgD0Ib4XqwKFU7nvbhOZdAZsU53OIhEXc03dV_QeqLA1_wiSwv_CmkP2HUmuiVe2WsL_hDMGztIbaalIEMR4yM7_JjRQmHaKo5xjwyzPCjV6TPOb4YHO-jyusQMSCX5plzguOQd-WfNhdPcn0lKMVlD63ww9DpVHvqF_RRi5A2WDY3cNxA1hKpPO1lRQKg4ubQpFlqC2EaMclJmUZO3QcIcsaTdsO0Vq4T4hHqzlRgsuqisXBbL1g8Aiodf_llAIZGwv68j2Ou3HD7d07KMnOs1ub4BS2GozX0TgvmbThF-1HY_jGtSvD9DOnX6) is the link with which I got my virtual environment set up. 

## Pre-requisites
- Python 3.x installed
- pip3 installed << this is different to pip. It is the Python 3 version

To meet these pre-requisites see the above link.

## Create the environment

```
python3 -m venv environment-name
```

This will create a folder inside the current working directory with the name you gave it. 

## Activate the environment

To use an environment, you need to activate it, which basically means running a script with:

```
source environment-name/bin/activate
```

Obviously there needs to be a file called `activate` in the bin folder.

Activating an environment changes your shell input. For me, because I'm using p10k and I've uncommented the virtualenv line in .p10k.zsh, it adds it on the right and looks sweet.

The python environment will stay active wherever you are in the file system, until you run the command `deactivate`.

## The effects of activating an environment

Firstly, the `python` command will be mapped to the version of Python defined in the environment. So `python` will now launch python 3, where before you had to write `python3`.