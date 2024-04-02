# from pywin32_system32 import win32serviceutil, win32service, win32event
import win32serviceutil
import win32service
import win32event
import servicemanager
import os
import sys

class MyService(win32serviceutil.ServiceFramework):
    _svc_name_ = "MyServiceName"
    _svc_display_name_ = "My Service Display Name"
    _svc_description_ = "My Service Description"

    def __init__(self, args):
        win32serviceutil.ServiceFramework.__init__(self, args)
        self.hWaitStop = win32event.CreateEvent(None, 0, 0, None)

    def SvcStop(self):
        self.ReportServiceStatus(win32service.SERVICE_STOP_PENDING)
        win32event.SetEvent(self.hWaitStop)

    def SvcDoRun(self):
        self.ReportServiceStatus(win32service.SERVICE_RUNNING)
        path = r"C:\Users\sanket\VS_Code\Pet_Adoption_app\PET_ADOPTION_FINAL\backend\runserver.py"
        os.system(f"python {path}")

if __name__ == '__main__':
    win32serviceutil.HandleCommandLine(MyService)
